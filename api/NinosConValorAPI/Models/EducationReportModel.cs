using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models
{
    public class EducationReportModel
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        public string? Grade { get; set; }
        [Required]
        public string? School { get; set; }
        public string? Rude { get; set; }
    }
}
