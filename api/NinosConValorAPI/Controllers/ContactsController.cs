using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids/{kidId:int}/[controller]")]
    public class ContactsController : Controller
    {
        private IContactService _contactsService;
        public ContactsController(IContactService contactsService)
        {
            _contactsService = contactsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactModel>>> GetContactsAsync(int kidId)
        {
            ActionResult<IEnumerable<ContactModel>> response;
            try
            {
                var contactsModel = await _contactsService.GetContactsAsync(kidId);
                response = Ok(contactsModel);
            }
            catch (NotFoundElementException ex)
            {
                response = NotFound(ex.Message);
            }
            catch (Exception)
            {
                response = StatusCode(StatusCodes.Status500InternalServerError, "General exception: Something happened");
            }
            return response;
        }

        [HttpPost]
        public async Task<ActionResult<ContactModel>> CreateContactsAsync(int kidId, [FromBody] ContactModel contactsData )
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newContactsData = await _contactsService.CreateContactAsync(kidId,contactsData);
                return Created($"/api/kids/{kidId}/[controllers]/contacts", newContactsData);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happened.");
            }
        }

        [HttpDelete("{contactId}")]
        public async Task<ActionResult> DeleteContactAsync(int kidId, int contactId)
        {
            try
            {
                await _contactsService.DeleteContactAsync(kidId, contactId);
                return Ok();
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }

        [HttpPut("{contactId}")]
        public async Task<ActionResult<ContactModel>> UpdateContactAsync(int kidId, int contactId, [FromBody] ContactModel contact)
        {
            try
            {
                var updatedContact = await _contactsService.UpdateContactAsync(kidId, contactId, contact);
                return Ok(updatedContact);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }
    }
}
