using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IContactsService
    {
        Task<ContactsModel> CreateContactsAsync(int kidId, ContactsModel contacts);
        Task<IEnumerable<ContactsModel>> GetContactsAsync(int kidId);
        //TO DO: define Delete and Update signature
        Task DeleteContactsAsync(int kidId);
        Task<ContactsModel> UpdateContactsAsync(int kidId, ContactsModel contacts);
    }
}
