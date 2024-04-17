import nodemailer from "nodemailer"



const transporter = nodemailer.createTransport({
  service: "suryaumpteen@gmail.com", // e.g., 'gmail'
  auth: {
    user: "suryaumpteen@gmail.com",
    pass: "egye onio jxeo rhmt",
  },
});

const  sendPasswordResetEmail= async(user, resetToken)=> {
  try {
    await transporter.sendMail({
      from: "suryaumpteen@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html:
        "<p>Hello " +
        user.firstName +
        " " +
        user.lastName +`, Please click here to <a href="http://localhost:3000/Resetpassword?resetToken=${resetToken}` +
        '"></br> Reset </a> your password. </p>',
    });
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
}
export default sendPasswordResetEmail;
