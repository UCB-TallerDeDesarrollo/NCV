using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Controllers;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ServiceUT
{
    public class HealthReportServiceUT
    {
        [Fact]
        public async Task CreateHealthReportAsync_HealthReportAddedToACreatedKid_ReturnsSameHealthReportWithId()
        {

            // ARRANGE
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var healthReportModel = new HealthReportModel()
            {
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = "Problema 1, Problema 2"
            };
            var healthReportEntity = new HealthReportEntity()
            {
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = "Problema 1, Problema 2"
            };

            int kidId = 1;
            var ncvRepositoryMock = new Mock<INCVRepository>();
            ncvRepositoryMock.Setup(r => r.CreateHealthReport(healthReportEntity)).ReturnsAsync(healthReportEntity);
            ncvRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

            var healthReportsController = new HealthReportService(ncvRepositoryMock.Object,mapper);

            // ACT
            var healthReportCreated = await healthReportsController.CreateHealthReportAsync(kidId, healthReportModel);

            // ASSERT
            Assert.Equal(1, healthReportCreated.KidId);
            Assert.Equal("ORH+", healthReportCreated.BloodType);
            Assert.Equal(1, healthReportCreated.Id);
        }
    }
}
