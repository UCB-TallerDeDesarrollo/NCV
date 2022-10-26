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
    public class BiometricsRepositoryUT : BaseTest
    {
        [Fact]
        public async Task CreateBiometricsAsync_AddBiometricsToDB_ReturnsBiometricsSaved()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var biometricsEntity = new BiometricsEntity()
            {
                Id = 1,
                Height = 90, 
                Weight = 35.5m, 
                RegisterDate = new DateTime(2015, 12, 25)
            };

            // ACT 
            biometricsEntity = await repository.CreateBiometricsAsync(biometricsEntity);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
            Assert.Equal(1,biometricsEntity.Id);
            Assert.Equal(90, biometricsEntity.Height);
        }
    }
}
