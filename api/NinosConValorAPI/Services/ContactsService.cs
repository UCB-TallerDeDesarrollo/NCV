using AutoMapper;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using NinosConValorAPI.Data.Entity;

namespace NinosConValorAPI.Services
{
    public class ContactsService : IContactsService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;

        public List<ContactsModel> listOfContacts;
        public ContactsService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;

            listOfContacts = new List<ContactsModel>()
            {
            new ContactsModel() {Name = "Mario" , Relationship = "Hermano Mayor" , ContactNumber = "78452169" , Address = "Calle calama N874"},
            new ContactsModel() {Name = "Ana" , Relationship = "Tia Maternal" , ContactNumber = "4587120 - 7748512" , Address = "Av. America y calle La"},
            };
        }
        public async Task<IEnumerable<ContactsModel>> GetContactsAsync(int kidId)
        {
            /*
            var contactsList = await _appRepository.GetContactsAsync(kidId);
            return _mapper.Map<IEnumerable<ContactsModel>>(contactsList);
            */
            return listOfContacts;
        }

        public async Task<ContactsModel> CreateContactsAsync(int kidId, ContactsModel contacts)
        {
            /*
            await ValidateIdKidAsync(kidId);
            var contactsEntity = _mapper.Map<ContactsEntity>(contacts);
            contactsEntity.KidId = kidId;
            var newSavedContacts = await _appRepository.CreateContactsAsync(contactsEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<ContactsModel>(newSavedContacts);
            }
            throw new Exception("Database Error");
*/
            listOfContacts.Add(contacts);
            return contacts;
        }

        public Task DeleteContactsAsync(int kidId)
        {
            throw new NotImplementedException();
        }

        public Task<ContactsModel> UpdateContactsAsync(int kidId, ContactsModel contacts)
        {
            throw new NotImplementedException();
        }
        private async Task ValidateIdKidAsync(int kidId)
        {
            var kid = await _appRepository.GetKidAsync(kidId);
            if (kid == null)
            {
                throw new Exception($"El niño con el id: {kidId} no existe en la base de datos.");
            }
        }
    }
}
