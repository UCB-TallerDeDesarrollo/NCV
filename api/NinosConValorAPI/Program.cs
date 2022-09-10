using Microsoft.EntityFrameworkCore;
using NinosConValorAPI.Data;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<IChildService, ChildService>();
builder.Services.AddTransient<INCVRepository, NCVRepository>();

builder.Services.AddAutoMapper(typeof(Program));
//entity framework config
//var connectionString = builder.Configuration.GetConnectionString("NinosConValorDB");
//builder.Services.AddDbContext<NCV_DBContext>(x => x.UseNpgsql(connectionString));

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true); //dates in postgresql

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();

