using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models
{
    public class FamilyReportModel
    {
        public int? SiblingsInFoundation { get; set; }
        public int? SiblingsOutside { get; set; }
        public bool? HasExtendedFamily { get; set; }
        public bool? HasOriginFamily { get; set; }
    }
}
