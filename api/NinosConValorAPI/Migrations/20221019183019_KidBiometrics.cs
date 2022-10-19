using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class KidBiometrics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BiometricsEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    KidId = table.Column<int>(type: "integer", nullable: false),
                    RegisterDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Weight = table.Column<decimal>(type: "numeric", nullable: true),
                    Height = table.Column<decimal>(type: "numeric", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BiometricsEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BiometricsEntity_Kid_KidId",
                        column: x => x.KidId,
                        principalTable: "Kid",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BiometricsEntity_KidId",
                table: "BiometricsEntity",
                column: "KidId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BiometricsEntity");
        }
    }
}
