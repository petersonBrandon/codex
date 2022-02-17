import dbConnect from '../../lib/connectDB';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

const crypto = require('crypto');

import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

export default async function handler(req, res) {
    const transporter = nodemailer.createTransport(
        sendgridTransport({
              auth: {
                api_key: process.env.SENDGRID_API
              }
        })
    );

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return
    } else {
        await dbConnect();

        const email = req.body.email;

        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                console.log(err);
                res.send(-2);
            }
            const token = buffer.toString('hex');
            User.findOne({email: email})
			    .then(user => {
                    const expiry = Date.now() + 3600000;
                    if(!user) {
                        res.send(-1);
                    } else {
                        user.resetToken = token;
                        user.resetTokenExpiration = expiry;
                        user.save();
                        res.send(1);
                    }
		        })
                .then(result => {
                    transporter.sendMail({
                        to: email,
                        from: "codexsolutionsofficial@gmail.com",
                        subject: "Password Reset",
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                        <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                            <head>
                              <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                              <!--[if !mso]><!-->
                              <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                              <!--<![endif]-->
                              <!--[if (gte mso 9)|(IE)]>
                              <xml>
                                <o:OfficeDocumentSettings>
                                  <o:AllowPNG/>
                                  <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                              </xml>
                              <![endif]-->
                              <!--[if (gte mso 9)|(IE)]>
                          <style type="text/css">
                            body {width: 600px;margin: 0 auto;}
                            table {border-collapse: collapse;}
                            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                            img {-ms-interpolation-mode: bicubic;}
                          </style>
                        <![endif]-->
                              <style type="text/css">
                            body, p, div {
                              font-family: arial,helvetica,sans-serif;
                              font-size: 14px;
                            }
                            body {
                              color: #000000;
                            }
                            body a {
                              color: #1188E6;
                              text-decoration: none;
                            }
                            p { margin: 0; padding: 0; }
                            table.wrapper {
                              width:100% !important;
                              table-layout: fixed;
                              -webkit-font-smoothing: antialiased;
                              -webkit-text-size-adjust: 100%;
                              -moz-text-size-adjust: 100%;
                              -ms-text-size-adjust: 100%;
                            }
                            img.max-width {
                              max-width: 100% !important;
                            }
                            .column.of-2 {
                              width: 50%;
                            }
                            .column.of-3 {
                              width: 33.333%;
                            }
                            .column.of-4 {
                              width: 25%;
                            }
                            ul ul ul ul  {
                              list-style-type: disc !important;
                            }
                            ol ol {
                              list-style-type: lower-roman !important;
                            }
                            ol ol ol {
                              list-style-type: lower-latin !important;
                            }
                            ol ol ol ol {
                              list-style-type: decimal !important;
                            }
                            @media screen and (max-width:480px) {
                              .preheader .rightColumnContent,
                              .footer .rightColumnContent {
                                text-align: left !important;
                              }
                              .preheader .rightColumnContent div,
                              .preheader .rightColumnContent span,
                              .footer .rightColumnContent div,
                              .footer .rightColumnContent span {
                                text-align: left !important;
                              }
                              .preheader .rightColumnContent,
                              .preheader .leftColumnContent {
                                font-size: 80% !important;
                                padding: 5px 0;
                              }
                              table.wrapper-mobile {
                                width: 100% !important;
                                table-layout: fixed;
                              }
                              img.max-width {
                                height: auto !important;
                                max-width: 100% !important;
                              }
                              a.bulletproof-button {
                                display: block !important;
                                width: auto !important;
                                font-size: 80%;
                                padding-left: 0 !important;
                                padding-right: 0 !important;
                              }
                              .columns {
                                width: 100% !important;
                              }
                              .column {
                                display: block !important;
                                width: 100% !important;
                                padding-left: 0 !important;
                                padding-right: 0 !important;
                                margin-left: 0 !important;
                                margin-right: 0 !important;
                              }
                              .social-icon-column {
                                display: inline-block !important;
                              }
                            }
                          </style>
                              <!--user entered Head Start--><!--End Head user entered-->
                            </head>
                            <body>
                              <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#111111;">
                                <div class="webkit">
                                  <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#111111">
                                    <tr>
                                      <td valign="top" bgcolor="#111111" width="100%">
                                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                            <td width="100%">
                                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                  <td>
                                                    <!--[if mso]>
                            <center>
                            <table><tr><td width="600">
                          <![endif]-->
                                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                              <tr>
                                                                <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#292929" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                            <tr>
                              <td role="module-content">
                                <p></p>
                              </td>
                            </tr>
                          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="15eac811-b133-4afd-861f-66f1aa6370f6">
                            <tbody>
                              <tr>
                                <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                </td>
                              </tr>
                            </tbody>
                          </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="af900c3f-b2e4-4f28-a690-f87ecf03c0de">
                            <tbody>
                              <tr>
                                <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                                  <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/534395f11c586a4f/b1d69b25-c442-4f7c-bb50-7ee88292fb45/2047x599.png">
                                </td>
                              </tr>
                            </tbody>
                          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1ee6af45-c629-494e-8807-7128767d66ab">
                            <tbody>
                              <tr>
                                <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                </td>
                              </tr>
                            </tbody>
                          </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="94958bf9-f3e7-4fb1-851d-57b22ac685fc">
                            <tbody>
                              <tr>
                                <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit; background-color:#292929;" height="100%" valign="top" bgcolor="#292929" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 24px">You are receiving this email because a request has been made to reset your password.</span></div>
                        <div style="font-family: inherit; text-align: center"><br></div>
                        <div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 24px">If you did not request this reset, please disregard this email.&nbsp;</span></div>
                        <div style="font-family: inherit; text-align: center"><br></div>
                        <div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 24px">If you did make this request, please click the link below to reset your password.</span></div><div></div></div></td>
                              </tr>
                            </tbody>
                          </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="5d69cf65-9cd6-458f-8194-088c14e15c58">
                              <tbody>
                                <tr>
                                  <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                                    <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                      <tbody>
                                        <tr>
                                        <td align="center" bgcolor="#004aad" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                          <a href="https://codexblog.herokuapp.com/dynamicRoutes/reset/${token}" style="background-color:#004aad; border:1px solid #333333; border-color:#333333; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:24px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Reset Password</a>
                                        </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#ffffff; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a></p></div></td>
                                                              </tr>
                                                            </table>
                                                            <!--[if mso]>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </center>
                                                    <![endif]-->
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </center>
                            </body>
                          </html>`
                    })
                });
        })
	}
}