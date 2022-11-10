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
                Features = "8Gb de RAM"
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
                Features = "8Gb de RAM"
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
         // BIOMETRICS DATA

        [Fact]
        public void AutomapperProfile_BiometricsModel_BiometricsEntity()
        {
            // ARRANGE
            var biometricsModel = new BiometricsModel()
            {
                Height = 90, 
                Weight = 35.5m, 
                RegisterDate = new DateTime(2015, 12, 25)
            };

            BiometricsEntity biometricsEntity = new BiometricsEntity();
            var typeOfbiometricsEntity = biometricsEntity.GetType().ToString();


            // ACT
            var actual = _mapper.Map<BiometricsEntity>(biometricsModel);
            var actualType = actual.GetType().ToString();

            // ASSERT
            Assert.Equal(typeOfbiometricsEntity, actualType);
            Assert.Equal(biometricsModel.Height, actual.Height);
            Assert.Equal(biometricsModel.Weight, actual.Weight);
        }
        [Fact]
        public void AutomapperProfile_BiometricsEntity_BiometricsModel()
        {
            // ARRANGE
            var biometricsEntity = new BiometricsEntity()
            {
                Id = 1,
                Height = 90, 
                Weight = 35.5m, 
                RegisterDate = new DateTime(2015, 12, 25)
            };

            BiometricsModel biometricsModel = new BiometricsModel();
            var typeOfbiometricsModel = biometricsModel.GetType().ToString();


            // ACT
            var actual = _mapper.Map<BiometricsModel>(biometricsEntity);
            var actualType = actual.GetType().ToString();

            // ASSERT
            Assert.Equal(typeOfbiometricsModel, actualType);
            Assert.Equal(biometricsEntity.Height, actual.Height);
            Assert.Equal(biometricsEntity.Weight, actual.Weight);

        }
        // EDUCATION REPORTS

        [Fact]
        public void AutomapperProfile_EducationReportModel_ReturnsEducationReportEntity()
        {
            // ARRANGE
            var educationReportModel = new EducationReportModel()
            {
                Id = 1,
                KidId = 1,
                Grade = "Primero Secundaria",
                School = "21 de Mayo",
                Rude = "12345678"
            };

            EducationReportEntity educationReportEntity = new EducationReportEntity();
            var typeOfEducationReportEntity = educationReportEntity.GetType().ToString();


            // ACT
            var actual = _mapper.Map<EducationReportEntity>(educationReportModel);
            var actualType = actual.GetType().ToString();

            // ASSERT
            Assert.Equal(typeOfEducationReportEntity, actualType);
            Assert.Equal(educationReportModel.Grade, actual.Grade);
            Assert.Equal(educationReportModel.Id, actual.Id);

        }

        [Fact]
        public void AutomapperProfile_EducationReportEntity_ReturnsEducationReportModel()
        {
            // ARRANGE
            var educationReportEntity = new EducationReportEntity()
            {
                Id = 1,
                KidId = 1,
                Grade = "Primero Secundaria",
                School = "21 de Mayo",
                Rude = "12345678"
            };

            EducationReportModel educationReportModel = new EducationReportModel();
            var typeOfEducationReportModel = educationReportModel.GetType().ToString();


            // ACT
            var actual = _mapper.Map<EducationReportModel>(educationReportEntity);
            var actualType = actual.GetType().ToString();

            // ASSERT
            Assert.Equal(typeOfEducationReportModel, actualType);
            Assert.Equal(educationReportEntity.Grade, actual.Grade);
            Assert.Equal(educationReportEntity.Id, actual.Id);

        }
    }
}
