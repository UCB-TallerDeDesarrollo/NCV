using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class BiometricsEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey("Kid")]
        public int KidId { get; set; }
        public virtual KidEntity Kid { get; set; }
        public DateTime RegisterDate { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Height { get; set; }
    }
}
