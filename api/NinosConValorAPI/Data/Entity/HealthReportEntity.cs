namespace NinosConValorAPI.Data.Entity
{
    public class HealthReportEntity
    {
        public int Id { get; set; }
        public int KidId { get; set; }
        public string? BloodType { get; set; }
        public string? CIDiscapacidad { get; set; }
        public string? PsychologicalDiagnosis { get; set; }
        public string? NeurologicalDiagnosis { get; set; }
        public string? SpecialDiagnosis { get; set; }
        public string? HealthProblems { get; set; }
    }
}
