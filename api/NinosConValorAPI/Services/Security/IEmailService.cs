using NinosConValorAPI.Models.Security;

namespace NinosConValorAPI.Services.Security
{
    public interface IEmailService
    {
        void SendEmail(EmailModel request);
    }
}
