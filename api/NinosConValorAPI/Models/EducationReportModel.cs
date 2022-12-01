using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models
{
    public class EducationReportModel
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        public string? Grade { get; set; }
        [Required(ErrorMessage = "Unidad Educativa  requerido")]
        public string? School { get; set; }
        [Required(ErrorMessage = "RUDE requerido")]
        public string? Rude { get; set; }
    }
}
