using System;
using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Data.Entity
{
    public class ChildEntity
    {
        [Key]
        public int Id { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CI { get; set; }
        public DateTime Birthdate { get; set; }
        public int programHouseId { get; set; }
        public DateTime BirthPlace { get; set; }
        public string? Gender { get; set; }
    }
}
