using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NinosConValorAPI.Data.Entity
{
    public class FamilyReportEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey("Kid")]
        public int KidId { get; set; }
        public virtual KidEntity Kid { get; set; }

        public int? SiblingsInFoundation { get; set; }
        public int? SiblingsOutside { get; set; }
        public bool? HasExtendedFamily { get; set; }
        public bool? HasOriginFamily { get; set; }
        
    }
}