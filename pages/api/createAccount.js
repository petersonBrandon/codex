import dbConnect from '../../lib/connectDB';
import User from '../../models/user';

import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';


export default async function handler(req, res) {
    if (req.method !== 'POST') {
      	res.status(405).send({ message: 'Only POST requests allowed' })
      	return
    } else {
        await dbConnect();

		const f_name = req.body.firstName;
		const l_name = req.body.lastName;
		const email = req.body.email;
		const password = req.body.password;
		const clearance = 1;

		const date = new Date();
        const cDay = date.getDate();
        const cMonth = date.getMonth() + 1;
        const cYear = date.getFullYear();
        const cHour = date.getHours();
        let cMinutes = date.getMinutes();

        if (cMinutes < 10) {
            cMinutes = `0${cMinutes}`;
        }

		const currentDate = `${cHour}:${cMinutes}  ${cMonth}/${cDay}/${cYear}`;

        const transporter = nodemailer.createTransport(
            sendgridTransport({
              	auth: {
                	api_key: process.env.SENDGRID_API
              	}
            })
        );

		User.findOne({email: email})
			.then(user => {
				if(user) {
					res.send(-1);
				} else {
					bcrypt
					.hash(password, 12)
					.then(hashedPassword => {
						const user = new User({
							f_name: f_name,
							l_name: l_name,
							email: email,
							pass: hashedPassword,
							dateCreated: currentDate,
							clearance: clearance
						});
						return user.save();
					})
					.then(result => {
						console.log(result);
						return transporter.sendMail({
							to: email,
							from: "codexsolutionsofficial@gmail.com",
							subject: "Welcome to Codex!",
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
								  color: #ffffff;
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
								  <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#ffffff; background-color:#3D3D3D;">
									<div class="webkit">
									  <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#3D3D3D">
										<tr>
										  <td valign="top" bgcolor="#3D3D3D" width="100%">
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
																	<td role="modules-container" style="padding:0px 0px 0px 0px; color:#ffffff; text-align:left;" bgcolor="#1F1F1F" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
								<tr>
								  <td role="module-content">
									<p></p>
								  </td>
								</tr>
							  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f3b3dc20-41bd-421d-8c77-3d1a645f2afa">
								<tbody>
								  <tr>
									<td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
									</td>
								  </tr>
								</tbody>
							  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ed06166a-d22c-4107-9d83-457276c8fd56">
								<tbody>
								  <tr>
									<td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
									  <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/534395f11c586a4f/b1d69b25-c442-4f7c-bb50-7ee88292fb45/2047x599.png">
									</td>
								  </tr>
								</tbody>
							  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="42679b92-6317-41ba-ac90-23430c902746">
								<tbody>
								  <tr>
									<td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
									</td>
								  </tr>
								</tbody>
							  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6456ff79-4229-4dfb-a5ee-23feb55bd1e1" data-mc-module-version="2019-10-22">
								<tbody>
								  <tr>
									<td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center">Thank you for signing up to Codex! We are excited to have you on our website!</div><div></div></div></td>
								  </tr>
								</tbody>
							  </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#ffffff; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="color:#ffffff;">Unsubscribe</a></p></div><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a60257a4-9b19-4494-8684-4d8b54355562">
								<tbody>
								  <tr>
									<td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
									</td>
								  </tr>
								</tbody>
							  </table></td>
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
				})
				.then (() => {
					res.send(1);
				})
			}
		});
	}
  }