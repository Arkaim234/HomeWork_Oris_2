using Microsoft.OpenApi;
using Microsoft.EntityFrameworkCore;
using OneToche.API.data;
using OneToche.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ITourService, TourService>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "OneToche API",
        Version = "v1",
        Description = "API для туров"
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

// Нужен для переноса данных с помощью DbSeeder из DataSeed
//using (var scope = app.Services.CreateScope())
//{
//    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//    context.Database.Migrate();
//    DbSeeder.Seed(context);
//}

app.Run();