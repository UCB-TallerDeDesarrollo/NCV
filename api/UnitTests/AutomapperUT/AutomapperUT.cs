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
        [Fact]
        public void AutomapperProfile_HealthReportEntity_ReturnsHealthReportModel()
        {
            // ARRANGE
            var healthReportEntity = new HealthReportEntity()
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

            HealthReportModel healthReportModel = new HealthReportModel();
            var typeOfHealthReportModel = healthReportModel.GetType().ToString();


            // ACT
            var actual = _mapper.Map<HealthReportModel>(healthReportEntity);
            var actualType = actual.GetType().ToString();

            // ASSERT
            Assert.Equal(typeOfHealthReportModel, actualType);
            Assert.Equal(healthReportEntity.CIDiscapacidad, actual.CIDiscapacidad);
            Assert.Equal(healthReportEntity.Id, actual.Id);

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
        // KID
        [Fact]
        public void AutomapperProfile_KidModel_ReturnsKidEntity()
        {
            // ARRANGE
            var kidModel = new KidModel()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };

            KidEntity kidEntity = new KidEntity();
            var typeOfKidEntity = kidEntity.GetType().ToString();


            // ACT
            var actual = _mapper.Map<KidEntity>(kidModel);
            var actualType = actual.GetType().ToString();

            // ASSERT
            Assert.Equal(typeOfKidEntity, actualType);
            Assert.Equal(kidModel.CI, actual.CI);
            Assert.Equal(kidModel.Id, actual.Id);

        }
        [Fact]
        public void AutomapperProfile_KidEntity_ReturnsKidModel()
        {
            // ARRANGE
            var kidEntity = new KidEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };

            KidModel kidModel = new KidModel();
            var typeOfKidModel = kidModel.GetType().ToString();


            // ACT
            var actual = _mapper.Map<KidModel>(kidEntity);
            var actualType = actual.GetType().ToString();

            // ASSERT
            Assert.Equal(typeOfKidModel, actualType);
            Assert.Equal(kidEntity.CI, actual.CI);
            Assert.Equal(kidEntity.Id, actual.Id);

        }
    }
}
