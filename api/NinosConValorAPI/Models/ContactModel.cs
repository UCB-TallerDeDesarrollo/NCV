using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models
{
    public class ContactModel
    {
        [Required(ErrorMessage = "Nombre requerido")]
        public string Name { get; set; }
        public string Relationship { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
    }
}
