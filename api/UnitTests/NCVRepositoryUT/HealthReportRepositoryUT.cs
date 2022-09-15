using Microsoft.Extensions.Diagnostics.HealthChecks;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTests.DBUT;

namespace UnitTests.NCVRepositoryUT
{
    //POR QUE BaseTest esta en el Namespace DBUT?
    public class HealthReportRepositoryUT : BaseTest
    {
        [Fact]
        public async Task CreateHealthReportAsync_AddHealthReportToEmptyDB_ReturnsTheHealthReport()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var healthReportEntity = new HealthReportEntity()
            {
                KidId = 1,
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = "Problema 1, Problema 2"
            };

            // ACT 
            healthReportEntity = await repository.CreateHealthReportAsync(healthReportEntity);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
            Assert.Equal(1,healthReportEntity.KidId);
            Assert.Equal("11111222", healthReportEntity.CIDiscapacidad);
        }
        [Fact]
        public async Task GetHealthReportAsync_GetAnExistingHealthReport_ReturnsHealthReportEntity()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var healthReportEntity = new HealthReportEntity()
            {
                KidId = 1,
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = "Problema 1, Problema 2"
            };
            int kidId = 1;

            repository.CreateHealthReportAsync(healthReportEntity);
            var result = await repository.SaveChangesAsync();

            // ACT 
            healthReportEntity = await repository.GetHealthReportAsync(kidId);

            // ASSERT
            Assert.Equal(1, healthReportEntity.Id);
            Assert.Equal(kidId, healthReportEntity.KidId);
            Assert.Equal("11111222", healthReportEntity.CIDiscapacidad);
        }
    }
}
