using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models
{
    public class ContactModel
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        [Required(ErrorMessage = "Nombre requerido")]
        public string Name { get; set; }
        public string Relationship { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
    }
}
