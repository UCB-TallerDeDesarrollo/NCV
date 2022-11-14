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
    public class EducationReportRepositoryUT : BaseTest
    {
        [Fact]
        public async Task CreateEducationReportAsync_AddEducationReportToEmptyDB_ReturnsTheEducationReport()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var educationReportEntity = new EducationReportEntity()
            {
                KidId = 1,
                Grade = "Primero Secundaria",
                School = "21 de Mayo",
                Rude = "12345678"
            };

            // ACT 
            educationReportEntity = await repository.CreateEducationReportAsync(educationReportEntity);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
            Assert.Equal(1,educationReportEntity.KidId);
            Assert.Equal("Primero Secundaria", educationReportEntity.Grade);
        }
        [Fact]
        public async Task GetEducationReportAsync_GetAnExistingEducationReport_ReturnsEducationReportEntity()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var educationReportEntity = new EducationReportEntity()
            {
                KidId = 1,
                Grade = "Primero Secundaria",
                School = "21 de Mayo",
                Rude = "12345678"
            };
            int kidId = 1;

            repository.CreateEducationReportAsync(educationReportEntity);
            var result = await repository.SaveChangesAsync();

            // ACT 
            educationReportEntity = await repository.GetEducationReportAsync(kidId);

            // ASSERT
            Assert.Equal(1, educationReportEntity.Id);
            Assert.Equal(kidId, educationReportEntity.KidId);
            Assert.Equal("Primero Secundaria", educationReportEntity.Grade);
        }

    }
}
