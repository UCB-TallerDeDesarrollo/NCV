using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Models
{
    public class KidModel
    {
        public int Id { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CI { get; set; }
        public DateTime? BirthDate { get; set; }
        public string ProgramHouse { get; set; }
        public string? BirthPlace { get; set; }
        public string? Gender { get; set; }
    }
}
