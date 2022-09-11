using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System.Security.Cryptography;

namespace NinosConValorAPI.Controllers
{
    [Route("api/kids")]
    public class KidsController : ControllerBase
    {
        private IKidService _kidService;

        public KidsController(IKidService kidService)
        {
            _kidService = kidService;
        }
        [HttpGet("{id:int}")]
        public ActionResult<KidModel> GetKid(int id)
        {
            try
            {
                var kid = _kidService.GetKid(id);
                return Ok(kid);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }

       
        [HttpGet]
        public ActionResult<IEnumerable<KidModel>> GetKids()
        {
            try
            {
                var kids = _kidService.GetKids(); // aqui
                return Ok(kids);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something happend.");
            }
        }

        [HttpPost]
        public ActionResult<KidModel> PostKid([FromBody] KidModel kid)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var newKid = _kidService.CreateKid(kid);
                return Created($"/api/kids/{newKid.Id}", newKid);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Simething happend.");
            }
        }
    }

}
