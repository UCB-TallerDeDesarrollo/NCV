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
        [HttpPut]
        public async Task<IActionResult> UpdateContactAsync(int kidId, [FromBody] ContactModel contactModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                return Ok(await _contactsService.UpdateContactAsync(kidId, contactModel));
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message); ;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }
    }
}
