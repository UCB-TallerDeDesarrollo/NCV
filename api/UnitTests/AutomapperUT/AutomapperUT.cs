using AutoMapper;
using NinosConValorAPI;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.AutomapperUT
{
    public class AutomapperUT
    {
        private IMapper _mapper;
        public AutomapperUT()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            _mapper = config.CreateMapper();
        }

        // HEALTH REPORTS

        [Fact]
        public void AutomapperProfile_HealthReportModel_ReturnsHealthReportEntity()
        {
            // ARRANGE
            var healthReportModel = new HealthReportModel()
            {
                Id = 1,
                KidId = 1,
                CIDiscapacidad = "11111222",
                NeurologicalDiagnosis = "Este es un ejemplo de diagnostico",
                PsychologicalDiagnosis = "Este es un ejemplo de diagnostico",
                SpecialDiagnosis = "Este es un diagnostico especial",
                BloodType = "ORH+",
                HealthProblems = "Problema 1, Problema 2"
            };

            HealthReportEntity healthReportEntity = new HealthReportEntity();
            var typeOfHealthReportEntity = healthReportEntity.GetType().ToString();


            // ACT
            var actual = _mapper.Map<HealthReportEntity>(healthReportModel);
            var actualType = actual.GetType().ToString();

            // ASSERT
            Assert.Equal(typeOfHealthReportEntity, actualType);
            Assert.Equal(healthReportModel.CIDiscapacidad, actual.CIDiscapacidad);
            Assert.Equal(healthReportModel.Id, actual.Id);

        }

        // FIXED ASSETS

        public FixedAssetEntity CreateDefaultFixedAssetEntity()
        {
            var fixedAssetEntity = new FixedAssetEntity() {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };
            return fixedAssetEntity;
        }
        public FixedAssetModel CreateDefaultFixedAssetModel()
        {
            var fixedAssetModel = new FixedAssetModel()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };
            return fixedAssetModel;
        }

        [Fact]
        public void AutomapperProfile_FixedAssetModel_ReturnsFixedAssetEntity()
        {
            //Arrange
            var fixedAssetModel = CreateDefaultFixedAssetModel();
            var fixedAssetEntity = new FixedAssetEntity();
            var typefixedAssetEntityType = fixedAssetEntity.GetType().ToString();

            //Act
            var actual = _mapper.Map<FixedAssetEntity>(fixedAssetModel);
            var actualType = actual.GetType().ToString();

            //Assert
            Assert.Equal(typefixedAssetEntityType, actualType);
        }
        [Fact]
        public void AutomapperProfile_FixedAssetEntity_ReturnsFixedAssetModel()
        {
            //Arrange
            var fixedAssetEntity = CreateDefaultFixedAssetEntity();
            var fixedAssetModel = new FixedAssetModel();
            var typefixedAssetModelType = fixedAssetModel.GetType().ToString();

            //Act
            var actual = _mapper.Map<FixedAssetModel>(fixedAssetEntity);
            var actualType = actual.GetType().ToString();

            //Assert
            Assert.Equal(typefixedAssetModelType, actualType);
        }
        
    }
}
