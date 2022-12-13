namespace NinosConValorAPI.Models
{
    public class BiometricsModel
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        public DateTime RegisterDate { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Height { get; set; }
    }
}
