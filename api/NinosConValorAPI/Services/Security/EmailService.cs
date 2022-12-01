using MimeKit;
using NinosConValorAPI.Models.Security;
using MailKit.Net.Smtp;
using MailKit;

namespace NinosConValorAPI.Services.Security
{
    public class EmailService : IEmailService
    { 
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration config)
        {
            _configuration = config;
        }
        public void SendEmail(EmailModel request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_configuration["EmailConfig:UserName"]));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = request.Body,
            };

            using var smtp = new SmtpClient();
            smtp.Connect(_configuration["EmailConfig:Host"],, 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_configuration["EmailConfig:UserName"], _configuration["EmailConfig:Password"]);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
