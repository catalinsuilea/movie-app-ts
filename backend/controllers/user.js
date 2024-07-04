const User = require("../models/user");
const fs = require("fs");
const path = require("path");

const STRIPE_KEY = process.env.STRIPE_KEY;
const NODEMAILER_KEY = process.env.NODEMAILER_KEY;
const EMAIL_SENDER = process.env.EMAIL_SENDER;

const stripe = require("stripe")(STRIPE_KEY);
const nodeMailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");

const logoPath = path.join(__dirname, "..", "logo", "movie-pilot.png");

let premiumPrice = 0;

const transporter = nodeMailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: NODEMAILER_KEY,
    },
  })
);

exports.getUserReviews = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ reviews: user.reviews });
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    user: {
      username: user.username,
      profile_picture: user.profile_picture,
      isPremiumUser: user.isPremiumUser,
      createdAt: user.createdAt,
    },
  });
};

exports.postUpload = async (req, res, next) => {
  const filePath = req?.file?.path?.replace(/\\/g, "/");
  if (!filePath) {
    return res.status(404).json({ message: "Please upload a file" });
  }
  const user = await User.findOne({ _id: req.userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.profile_picture) {
    try {
      fs.unlinkSync(user.profile_picture);
    } catch (error) {
      console.error("Error deleting old profile picture:", error);
    }
  }
  user.profile_picture = filePath;
  await user.save();

  return res.status(200).json({
    user_profile_picture: filePath,
    message: "Image uploaded successfully",
  });
};

exports.postDeleteUser = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const user = await User.findOne({ _id: userId.toString() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne({ _id: userId });
    return res.status(200).json({ message: "User deleted successfuly" });
  } catch (err) {
    return res.status(500).json({
      message: "Error when trying to delete the user. Please try again later",
    });
  }
};

exports.postBuyPremium = async (req, res, next) => {
  const { offer, price } = req.body || {};
  premiumPrice = price;

  try {
    const user = await User.findOne({ _id: req.userId.toString() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const premiumToken = crypto.randomBytes(20).toString("hex");
    user.premiumToken = premiumToken;
    await user.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: offer,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_DEPLOYED_URL}/checkout/success/${premiumToken}`,
      cancel_url: `${process.env.FRONTEND_DEPLOYED_URL}/checkout/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    return res.status(500).json({
      message: "Premium acquisition failed. Please try again later",
    });
  }
};

exports.checkPaymentStatus = async (req, res, next) => {
  const { premiumToken } = req.params || {};
  try {
    const user = await User.findOne({
      _id: req.userId,
      premiumToken: premiumToken,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found or invalid token",
        paymentSucces: false,
      });
    }

    if (user.isPremiumUser) {
      return res.status(409).json({
        message: "Already a premium user",
        paymentSucces: false,
      });
    }
    user.isPremiumUser = true;
    user.premiumToken = "";
    user.premiumPriceValue = premiumPrice;
    await user.save();
    await transporter.sendMail({
      from: EMAIL_SENDER,
      to: user.email,
      subject: "Premium subscription",
      text: `Dear ${user.username},

    We are excited to inform you that your premium subscription has been successfully activated! We are committed to providing you with the best experience and tools to elevate your professional journey in the entertainment industry.

    Next Steps:
    1.Explore Premium Features: Log in to your account and start exploring the premium features available to you.
    2.Profile Customization: Update your MoviePilot App profile to showcase your latest work and achievements.
    3.Stay Updated: Keep an eye on industry insights and opportunities that can propel your career forward.

    Best regards,
    MoviePilot App`,
    });
    return res.status(200).json({ paymentSuccess: true });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error. Please try again later",
      paymentSucces: false,
    });
  }
};

exports.cancelPremium = async (req, res, next) => {
  const { userId } = req.body || {};

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isPremiumUser = false;
    await user.save();

    return res.status(200).json({ message: "Premium canceled successfully" });
  } catch (err) {
    return res.status(500).json({
      message:
        "There was an error while canceling your premium. Please try again later.",
    });
  }
};

exports.getInvoice = async (req, res, next) => {
  try {
    const { id } = req.params || {};

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const invoiceName = `invoice-${id}${user.username}.pdf`;
    const invoiceDir = path.join(__dirname, "..", "invoices");
    const invoicePath = path.join(invoiceDir, invoiceName);

    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const pdfDoc = new PDFDocument();

    res.setHeader("Content-type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename= "' + invoiceName + '"'
    );

    const logoPath = path.join(__dirname, "..", "path-to-logo", "logo.png");
    if (fs.existsSync(logoPath)) {
      const logo = fs.readFileSync(logoPath);
      pdfDoc.image(logo, {
        fit: [100, 100],
        align: "center",
        valign: "top",
      });
    }

    const writeStream = fs.createWriteStream(invoicePath);
    writeStream.on("error", (err) => {
      console.error(`Error writing to file: ${err.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
    });

    pdfDoc.pipe(writeStream);
    pdfDoc.pipe(res);

    pdfDoc.fontSize(26).text("Invoice", { underline: true, align: "center" });

    pdfDoc.moveDown();

    pdfDoc
      .fontSize(18)
      .text(`You bought premium for $${user.premiumPriceValue}`, {
        align: "center",
      });

    pdfDoc.moveDown();
    pdfDoc.moveTo(50, pdfDoc.y).lineTo(550, pdfDoc.y).stroke();

    pdfDoc.moveDown();

    pdfDoc.fontSize(14).text(`Invoice ID: ${id}`, { align: "left" });
    pdfDoc.fontSize(14).text(`User: ${user.username}`, { align: "left" });

    pdfDoc.end();
  } catch (error) {
    console.error(`Error generating invoice: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
