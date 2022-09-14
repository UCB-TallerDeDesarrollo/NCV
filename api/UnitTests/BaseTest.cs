using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NinosConValorAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.DBUT
{
    public class BaseTest
    {
        protected NCV_DBContext ctx;
        public BaseTest(NCV_DBContext ctx = null)
        {
            this.ctx = ctx ?? GetInMemoryDBContext();
        }
        protected NCV_DBContext GetInMemoryDBContext()
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<NCV_DBContext>();
            var options = builder.UseInMemoryDatabase("testDB").UseInternalServiceProvider(serviceProvider).Options;

            NCV_DBContext dbContext = new NCV_DBContext(options);
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
            return dbContext;
        }


    }
}
