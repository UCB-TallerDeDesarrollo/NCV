using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Models.Security;
using NinosConValorAPI.Services;
using NinosConValorAPI.Services.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/auth/Login
        [HttpPost("Login")]
        public async Task<ActionResult<UserManagerResponse>> LoginAsync([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid) 
            {
                var result = await _userService.LoginUserAsync(model);

                if (result.IsSuccess)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid");
        }

        /*[HttpPost("SuperUser")]
        public async Task<IActionResult> RegisterSuperuserAsync([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.RegisterSuperUserAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Status Code: 200 
                    
                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid"); // Status code: 400
        }*/

        [HttpPost("{rol}")]
        public async Task<IActionResult> RegisterUserAndRolAsync(string rol,[FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.RegisterUserRole(model, rol);

                if (result.IsSuccess)
                    return Ok(result); // Status Code: 200 

                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid"); // Status code: 400
        }


        ///[Authorize(Roles = "Admin")]
        [HttpPost("Role")]
        public async Task<IActionResult> CreateRolenAsync([FromBody] CreateRoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.CreateRoleAsync(model);

                if (result.IsSuccess)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid");
        }

        [HttpPost("UserRole")]
        public async Task<IActionResult> CreateUserRolenAsync([FromBody] CreateUserRoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.CreateUserRoleAsync(model);

                if (result.IsSuccess)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserBasicInformationModel>>> GetUsersAsync()
        {
            try
            {
                var usersList = await _userService.GetUsersAsync();
                return Ok(usersList);
            }
            catch (NotFoundElementException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Lo sentimos, algo sucedió.");
            }

        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<EditUserViewModel>> GetUserAsync(string userId)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(userId);
                return Ok(user);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] EditUserViewModel model, string userId)
        {
            
            var result = await _userService.UpdateUsersAsync(model, userId);

            if (result.IsSuccess)
                return Ok(result); // Status Code: 200 

            return BadRequest(result);
           
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUserAsync(string userId)
        {
            
            if (userId == null)
            {
                return BadRequest("Id invalid"); // Status code: 400
            }
            var result = await _userService.DeleteUserAsync(userId);
            if (result.IsSuccess)
                return Ok(result);
            return BadRequest(result);
        }

        [HttpPost("ChangePass")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword(ChangePassword model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var result = await _userService.ChangePassword(model);
            if (result.IsSuccess)
                return Ok(result); // Status Code: 200 

            return BadRequest(result);
        }
    }
}
