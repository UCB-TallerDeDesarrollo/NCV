using Microsoft.EntityFrameworkCore;
using NinosConValorAPI.Data;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<IFixedAssetService, FixedAssetService>();
builder.Services.AddTransient<INCVRepository, NCVRepository>();

builder.Services.AddAutoMapper(typeof(Program));
//entity framework config
var connectionString = builder.Configuration.GetConnectionString("NinosConValorDB");
builder.Services.AddDbContext<NCV_DBContext>(x => x.UseNpgsql(connectionString));

//CORS configuration
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => { options.AllowAnyOrigin(); options.AllowAnyMethod(); options.AllowAnyHeader(); });
});


AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true); //dates in postgresql

var app = builder.Build();

// Configure the HTTP request pipeline.

//CORS 
app.UseCors(options => { options.AllowAnyOrigin(); options.AllowAnyMethod(); options.AllowAnyHeader(); });

app.UseAuthorization();

app.MapControllers();

app.Run();

