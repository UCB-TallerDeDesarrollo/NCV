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
    public class AssetStateRepositoryUT : BaseTest
    {
        [Fact]
        public async Task CreateAssetState_AddAssetStateToEmptyDB_ReturnsTrueSavedCorrectly()
        {
            var repository = new NCVRepository(ctx);            
            var  assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };                      
            repository.CreateAssetState(assetState);
            var result = await repository.SaveChangesAsync();
            Assert.True(result);
        }

        [Fact]
        public async Task GetAssetStates_ReturnListOfAssetStates()
        {
            var repository = new NCVRepository(ctx);           
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };            
            repository.CreateAssetState(assetState);
            var result = await repository.SaveChangesAsync();            
            var listAssetStates = await repository.GetAssetStatesAsync();
            var numberOfAssetStates = listAssetStates.Count();
            Assert.Equal(1, numberOfAssetStates);
        }

        [Fact]
        public async Task GetAssetState_ReturnAssetStateName()
        {
            var repository = new NCVRepository(ctx);        
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto",
            };           
            await repository.CreateAssetState(assetState);
            var result = await repository.SaveChangesAsync();
            var firstAssetState = await repository.GetAssetStateAsync(1);

            Assert.Equal("Obsoleto", firstAssetState.State);
        }

        [Fact]
        public async Task DeleteAssetState()
        {
            var repository = new NCVRepository(ctx);
            var assetState = new AssetStateEntity()
            {
                Id = 1,
                State = "Obsoleto"
            };
            ctx.Add(assetState);
            ctx.SaveChanges();
            await repository.DeleteAssetStateAsync(1);
            var result = await repository.SaveChangesAsync();
            Assert.True(result);
        }        

    }
}
