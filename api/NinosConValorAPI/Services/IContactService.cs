using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IContactService
    {
        Task<ContactModel> CreateContactAsync(int kidId, ContactModel contacts);
        Task<IEnumerable<ContactModel>> GetContactsAsync(int kidId);
        Task DeleteContactAsync(int kidId, int contactId);
        Task<ContactModel> UpdateContactAsync(int kidId, int contactId, ContactModel contact);

        Task<ContactModel> GetContactAsync(int kidId, int contactId);
    }
}
