using Microsoft.AspNetCore.DataProtection.KeyManagement;
using NinosConValorAPI.Models.Security;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public class ProgramHouseEntity
    {
        
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Acronym { get; set; }
        public string? Location { get; set; }

        [Required]
        [ForeignKey("ResponsibleId")]
        public virtual IdentityAppUser? ResponsibleUser { get; set; }

        //fixed assets that belong to the program house
        public ICollection<FixedAssetEntity>? FixedAssets { get; set; }
        public virtual ICollection<KidEntity>? Kids { get; set; }

    }
}
