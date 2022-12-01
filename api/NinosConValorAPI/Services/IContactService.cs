using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IContactService
    {
        Task<ContactModel> CreateContactAsync(int kidId, ContactModel contacts);
        Task<IEnumerable<ContactModel>> GetContactsAsync(int kidId);
        //TO DO: define Delete and Update signature
        Task DeleteContactAsync(int kidId);
        Task<ContactModel> UpdateContactAsync(int kidId, int contactId,ContactModel contacts);
    }
}
