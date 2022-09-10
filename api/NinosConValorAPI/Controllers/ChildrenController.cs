using Microsoft.AspNetCore.Mvc;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System;

namespace NinosConValorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ChildrenController : ControllerBase
    {
        private IChildService _childService;

        public ChildrenController(IChildService childService)
        {
            _childService = childService;
        }
        [HttpGet("{id:int}")]
        public ActionResult<ChildModel> GetChild(int id)
        {
            try
            {
                var child = _childService.GetChild(id);
                return Ok(child);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }
        [HttpPost]
        public ActionResult<ChildModel> CreateChild([FromBody] ChildModel child)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var newChild = _childService.CreateChild(child);
                return Created($"/api/children/{newChild.Id}", newChild);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happened.");
            }
        }
    }
}