#pragma once
#include "stdafx.h"
#include <Windows.h>
// 在此修改版本
#define MsVer 120

DWORD ulMsCrcStart = 0x00401000; // static
DWORD ulMsCrcEnd = ulMsCrcStart; // modify as needed
void* Allocation;
#define jmp(frm, to) (int)(((int)to - (int)frm) - 5)

#if MsVer == 113
#define CrcAddress 0x00A11481
void __declspec(naked) MsCrcAsm()
{
	__asm
	{
			cmp ecx, [ulMsCrcStart]
			jb Normal
			cmp ecx, [ulMsCrcEnd]
			ja Normal
			sub ecx, [ulMsCrcStart]
			add ecx, Allocation

		Normal :
			movzx ecx, byte ptr[ecx]
			mov edx, [ebp + 0x14]
			ret
	}
}
#elif MsVer == 120
#define CrcAddress 0x00B84329
#define CrcAddress2 0x00B84612
void __declspec(naked) MsCrcAsm()
{
	__asm
	{
			push eax
			lea eax, [esi + edx * 4]
			cmp eax, [ulMsCrcStart]
			jb Normal
			cmp eax, [0x00C01000]
			jae Normal
			mov esi, Allocation

	Normal :
			pop eax
			mov ecx,[ecx]
			xor ecx,[esi+edx*4]
			ret
	}
}
#endif


void MsCrcBypass()
{
	MEMORY_BASIC_INFORMATION mbi;
	VirtualQuery((void*)ulMsCrcStart, &mbi, sizeof(MEMORY_BASIC_INFORMATION));
	ulMsCrcEnd += mbi.RegionSize;
	//Allocate some space for the unmodified memory
	Allocation = VirtualAlloc(NULL, ulMsCrcEnd - ulMsCrcStart, MEM_COMMIT, PAGE_EXECUTE_READWRITE);
	//Unprotect MS' memory
	unsigned long ulProtect;
	VirtualProtect((void*)ulMsCrcStart, ulMsCrcEnd - ulMsCrcStart, PAGE_EXECUTE_READWRITE, &ulProtect);
	
	//Copy the original, unedited memory
	memcpy(Allocation, (void*)ulMsCrcStart, ulMsCrcEnd - ulMsCrcStart);

	//inline call
#if MsVer == 113
	*(unsigned char*)CrcAddress = 0xE8;
	*(unsigned long*)(CrcAddress + 1) = jmp(CrcAddress, MsCrcAsm);
	*(unsigned char*)(CrcAddress + 5) = 0x90;
#elif MsVer == 120
	* (unsigned char*)CrcAddress = 0xE8;
	*(unsigned long*)(CrcAddress + 1) = jmp(CrcAddress, MsCrcAsm);
	*(unsigned char*)CrcAddress2 = 0xE8;
	*(unsigned long*)(CrcAddress2 + 1) = jmp(CrcAddress2, MsCrcAsm);
#endif
	//Skip HS
	//74 21 8B 0D ?? ?? ?? ?? E8 ?? ?? ?? ?? 8B 0D ?? ?? ?? ?? E8 ?? ?? ?? ?? 8B 0D ?? ?? ?? ?? E8 ?? ?? ?? ?? E8 ?? ?? ?? ?? E8
	//v113
#if MsVer == 113
	*(unsigned char*)0x00A11996 = 0xEB;
	*(unsigned char*)0x00A6D7F6 = 0xC3;
	*(unsigned char*)0x00A6D834 = 0xC3;
	//v120
#elif MsVer == 120
	*(unsigned char*)0x00B84EB9 = 0xEB;
	*(unsigned char*)0x00BEDE16 = 0xC3;
	*(unsigned char*)0x00BEDDD8 = 0xC3;

	// 頂傷破攻
	*(unsigned int*)(0x00865323 + 2) = (int)999999;
	*(unsigned int*)(0x00867A6A + 2) = (int)999999;
	*(unsigned int*)(0x00867A77 + 2) = (int)999999;
	*(unsigned int*)(0x00867CD4 + 2) = (int)999999;
	*(unsigned int*)(0x00867CE1 + 2) = (int)999999;
	*(unsigned int*)(0x00868D0C + 2) = (int)999999;
	*(unsigned int*)(0x00868D19 + 2) = (int)999999;
	*(unsigned int*)(0x00869D3F + 2) = (int)999999;
	*(unsigned int*)(0x00869D4C + 2) = (int)999999;
	*(unsigned int*)(0x0086A211 + 2) = (int)999999;
	*(unsigned int*)(0x0086A21E + 2) = (int)999999;
	*(unsigned int*)(0x0086A461 + 2) = (int)999999;
	*(unsigned int*)(0x0086A46E + 2) = (int)999999;

	// 法師類魔攻顯示突破
	*(unsigned char*)(0x008509D8) = 0x7F;
	*(unsigned char*)(0x008509D8 + 1) = 0x84;
	*(unsigned char*)(0x008509D8 + 2) = 0x1E;
	*(unsigned char*)(0x008509D8 + 3) = 0x00;

	// 法師類魔攻突破
	*(unsigned char*)(0x00868078) = 0x7F;
	*(unsigned char*)(0x00868078 + 1) = 0x84;
	*(unsigned char*)(0x00868078 + 2) = 0x1E;
	*(unsigned char*)(0x00868078 + 3) = 0x00;

	// 物理攻擊顯示突破
	*(unsigned char*)(0x00A026B8) = 0x7F;
	*(unsigned char*)(0x00A026B8 + 1) = 0x84;
	*(unsigned char*)(0x00A026B8 + 2) = 0x1E;
	*(unsigned char*)(0x00A026B8 + 3) = 0x00;

	//4開頭髮型
	*(unsigned char*)(0x00675DE9 + 2) = 0x04;
	*(unsigned char*)(0x00675DEC + 1) = 0x8E;
#endif
	return;
}

