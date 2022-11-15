using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class ContactsEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey("Kid")]
        public int KidId { get; set; }
        public virtual KidEntity Kid { get; set; }
        
        public string Name { get; set; }
        public string Relationship { get; set; }
        public string? ContactNumber { get; set; }
        public string? Address { get; set; }
    }
}
