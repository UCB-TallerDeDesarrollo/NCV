using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models
{
    public class KidModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Nombre  requerido")]
        public string? FirstName { get; set; }
        [Required(ErrorMessage = "Apellido  requerido")]
        public string? LastName { get; set; }
        [Required(ErrorMessage = "CI requerido")]
        public string? CI { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? ProgramHouse { get; set; }
        public string? BirthPlace { get; set; }
        public string? Gender { get; set; }
    }
}
