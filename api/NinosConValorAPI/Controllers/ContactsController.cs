using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids/{kidId:int}/[controller]")]
    public class ContactsController : Controller
    {
        private IContactsService _contactsService;
        public ContactsController(IContactsService contactsService)
        {
            _contactsService = contactsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactsModel>>> GetContactsAsync(int kidId)
        {
            ActionResult<IEnumerable<ContactsModel>> response;
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
        public async Task<ActionResult<ContactsModel>> CreateContactsAsync(int kidId, [FromBody] ContactsModel contactsData )
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newContactsData = await _contactsService.CreateContactsAsync(kidId,contactsData);
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
    }
}
