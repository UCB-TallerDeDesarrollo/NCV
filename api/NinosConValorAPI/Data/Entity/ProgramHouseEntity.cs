using Microsoft.AspNetCore.DataProtection.KeyManagement;
using NinosConValorAPI.Models.Security;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public class ProgramHouseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Acronym { get; set; }
        public string? Location { get; set; }

        [Required]
        [ForeignKey("ResponsibleId")]
        public virtual IdentityAppUser ResponsibleUser { get; set; }


    }
}
