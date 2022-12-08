using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class tookOutFixedAssetFieldsDescriptionEntryDateFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "FixedAsset");

            migrationBuilder.DropColumn(
                name: "EntryDate",
                table: "FixedAsset");

            migrationBuilder.DropColumn(
                name: "Features",
                table: "FixedAsset");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "FixedAsset",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EntryDate",
                table: "FixedAsset",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Features",
                table: "FixedAsset",
                type: "text",
                nullable: true);
        }
    }
}
