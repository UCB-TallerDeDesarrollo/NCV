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

        public Task DeleteContactAsync(int kidId)
        {
            throw new NotImplementedException();
        }
    
        public async Task<ContactModel> UpdateContactAsync(int kidId, ContactModel contacts)
        {
            await ValidateIdKidAsync(kidId);
            var contactEntity = _mapper.Map<ContactEntity>(contacts);
            contactEntity = await _appRepository.UpdateContactAsync(kidId, contactEntity);
            var saveResult = await _appRepository.SaveChangesAsync();
            if (!saveResult)
            {
                throw new Exception("Database Error");
            }
            return _mapper.Map<ContactModel>(contactEntity);
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
