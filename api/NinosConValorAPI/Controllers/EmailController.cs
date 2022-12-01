using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models.Security;
using NinosConValorAPI.Services.Security;

namespace NinosConValorAPI.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailController : Controller
    { 
        private IEmailService _emailService;
        private IUserService _userService;
        public EmailController(IEmailService emailService, IUserService userService)
        {
            _emailService = emailService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword([FromBody] UserRecoverPasswordModel user_model)
        {
            try
            {
                if (user_model.Email == null)
                {
                    return BadRequest("Email invalid"); // Status code: 400
                }
                var user = await _userService.GetUserByEmailAsync(user_model.Email);


                return Ok("Email of recuperation sended");
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
