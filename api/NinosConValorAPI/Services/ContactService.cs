using AutoMapper;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using NinosConValorAPI.Data.Entity;

namespace NinosConValorAPI.Services
{
    public class ContactService : IContactService
    {
        private INCVRepository _appRepository;
        private IMapper _mapper;

        public List<ContactModel> listOfContacts;
        public ContactService(INCVRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ContactModel>> GetContactsAsync(int kidId)
        {
            await ValidateIdKidAsync(kidId);
            var contactsList = await _appRepository.GetContactsAsync(kidId);
            return _mapper.Map<IEnumerable<ContactModel>>(contactsList);
        }

        public async Task<ContactModel> CreateContactAsync(int kidId, ContactModel contact)
        {
            
            await ValidateIdKidAsync(kidId);
            var contactEntity = _mapper.Map<ContactEntity>(contact);
            contactEntity.KidId = kidId;
            var newSavedContact = await _appRepository.CreateContactAsync(contactEntity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<ContactModel>(newSavedContact);
            }
            throw new Exception("Database Error");
        }
        public async Task DeleteContactAsync(int kidId, int contactId)
        {
            await GetContactAsync(kidId, contactId);
            await _appRepository.DeleteContactAsync(kidId, contactId);
            var result = await _appRepository.SaveChangesAsync();
            if (!result)
            {
                throw new Exception("Database Error.");

            }
        }

        public async Task<ContactModel> UpdateContactAsync(int kidId, int contactId, ContactModel contact)
        {
            await GetContactAsync(kidId, contactId);
            var entity = _mapper.Map<ContactEntity>(contact);
            await _appRepository.UpdateContactAsync(kidId, contactId, entity);
            var result = await _appRepository.SaveChangesAsync();
            if (result)
            {
                return _mapper.Map<ContactModel>(entity);
            }

            throw new Exception("Database Error.");
        }

        public async Task<ContactModel> GetContactAsync(int kidId, int contactId)
        {
            await ValidateIdKidAsync(kidId);

            var contact = await _appRepository.GetContactAsync(kidId,contactId);
            if (contact == null)
                throw new Exception($"the contact with id:{contactId} does not exists for the given kid with id: {kidId}.");

            return _mapper.Map<ContactModel>(contact);
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
