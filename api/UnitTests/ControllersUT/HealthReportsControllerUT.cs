using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NinosConValorAPI.Controllers;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ControllersUT
{
    public class HealthReportsControllerUT
    {
        [Fact]
        public async Task CreateHealthReportAsync_HealthReportAddedToACreatedKid_ReturnsSameHealthReportWithId()
        {
            //ARRANGE
            var martina = new KidModel()
            {
                Id = 1,
                FirstName = "Checo",
                LastName = "Perez",
                CI = "111111111",
                BirthPlace = "Mexico",
                BirthDate = new DateTime(2007, 3, 5),
                Gender = "Masculino",
                ProgramHouse = "En algun lugar de un gran pais"
            };

            var healthProblems = new List<string>() { "Problema 1", "Problema 2" } as List<string>;
            var healthReportModel = new HealthReportModel()
            {
                KidId = 1,
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = healthProblems
            };

            var healthReportServiceMock = new Mock<IHealthReportService>();
            healthReportServiceMock.Setup(r => r.CreateHealthReportAsync(healthReportModel)).ReturnsAsync(new HealthReportModel()
            {
                Id = 1,
                KidId = 1,
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = healthProblems
            });
            var healthReportsController = new HealthReportsController(healthReportServiceMock.Object);
            
            var response = await healthReportsController.CreateHealthReportAsync(healthReportModel);
            var status = response.Result as CreatedResult;
            var healthReportCreated = status.Value as HealthReportModel;

            Assert.Equal("ORH-", healthReportCreated.BloodType);
            Assert.Equal(1, healthReportCreated.Id);
            Assert.Equal(201, status.StatusCode);
        }
    }
}
