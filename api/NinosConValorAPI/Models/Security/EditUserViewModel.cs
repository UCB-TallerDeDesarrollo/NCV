using System;
using System.ComponentModel.DataAnnotations;

namespace NinosConValorAPI.Models.Security
{
    public class EditUserViewModel
    {
        //public string Id { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string CellPhone { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
