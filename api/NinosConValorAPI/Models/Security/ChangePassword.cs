namespace NinosConValorAPI.Models.Security
{
    public class ChangePassword
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set;}
        public string  IdUser { get; set; }
    }
}
