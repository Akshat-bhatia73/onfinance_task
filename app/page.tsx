'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, Sector } from "recharts"
import { Download, Upload, ExternalLink, Search } from 'lucide-react'
import { useState } from "react"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"

// Sample data for the pie chart
const data = [
  {
    name: "Tech & Process Resilience",
    weightage: 40,
    score: 1,
    scoreStatus: "Very Bad",
    color: "#1e40af",
    details: "Technology infrastructure assessment completed. Process automation in initial stages. Resilience testing pending."
  },
  {
    name: "Investor Education",
    weightage: 17,
    score: 2,
    scoreStatus: "Bad",
    color: "#2563eb",
    details: "Investor awareness programs launched. Educational materials in development. Digital platform planning phase."
  },
  {
    name: "Regulatory Role",
    weightage: 15,
    score: 3,
    scoreStatus: "Good",
    color: "#3b82f6",
    details: "Strong regulatory framework established. Regular monitoring implemented. Policy updates in progress."
  },
  {
    name: "Regulatory Compliance",
    weightage: 10,
    score: 1,
    scoreStatus: "Very Bad",
    color: "#60a5fa",
    details: "Compliance reviews ongoing. Some gaps identified. Action plan in development."
  },
  {
    name: "Governance Practices",
    weightage: 8,
    score: 1,
    scoreStatus: "Very Bad",
    color: "#93c5fd",
    details: "Governance structure review completed. Updates needed. Implementation planned."
  },
  {
    name: "Resource Adequacy",
    weightage: 5,
    score: 1,
    scoreStatus: "Very Bad",
    color: "#bfdbfe",
    details: "Resource assessment completed. Gaps identified. Enhancement plan pending."
  },
  {
    name: "Stakeholder Treatment",
    weightage: 5,
    score: 1,
    scoreStatus: "Bad",
    color: "#dbeafe",
    details: "Stakeholder engagement framework established. Feedback mechanism in place. Improvements needed."
  }
];

// Add these at the component level
const searchSuggestions = [
  "Risk assessment framework implementation",
  "Regulatory compliance status",
  "Technology infrastructure audit",
  "Cyber security measures",
  "System vulnerability analysis",
  "Data protection protocols",
  "Stakeholder engagement metrics",
  "Compliance monitoring system",
  "Audit trail verification",
  "Security breach prevention"
];

export default function Component() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Sample responses that we'll filter
  const responses = [
    {
      text: "Timely resolution of high-risk observations from findings of SEBI System Audit",
      files: "5 files analyzed",
      tags: ["audit", "risk", "sebi", "system"]
    },
    {
      text: "Technology resilience index score Alignment of enterprise related goals with Information Technology goals",
      files: "",
      tags: ["technology", "enterprise", "goals", "resilience"]
    },
    {
      text: "Maintenance of excess capacity and review of capacity planning",
      files: "",
      tags: ["capacity", "planning", "maintenance"]
    },
    {
      text: "Development of technology resources for internal consumption",
      files: "",
      tags: ["technology", "resources", "development"]
    },
    {
      text: "Timely resolution of high-risk observations from Cyber Security Audit, SEBI Cyber Security and Cyber Resilience Audit",
      files: "",
      tags: ["cyber security", "audit", "risk", "resilience"]
    },
    {
      text: "High-risk observations from Cyber Security Audit",
      files: "",
      tags: ["cyber security", "audit", "risk"]
    }
  ];

  // Filter responses based on search query
  const filteredResponses = searchQuery
    ? responses.filter(response => 
        response.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        response.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : responses;

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    const score = payload.score;
    const maxRadius = outerRadius + 40; // Maximum radius for score rings
    const scoreRadius = outerRadius + (score / 4) * 40; // Scale based on score (0-4)

    return (
      <g>
        {/* Score rings (1-4) */}
        {[1, 2, 3, 4].map((ring) => (
          <circle
            key={ring}
            cx={cx}
            cy={cy}
            r={outerRadius + (ring * 40) / 4}
            fill="none"
            stroke="#ddd"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ))}
        
        {/* Active sector */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={scoreRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        
        {/* Base sector */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.5}
        />
      </g>
    );
  };

  return (
    <div className="w-full max-w-8xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="w-full border rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">MII Performance Evaluation Report</h1>
            <p className="text-xs text-muted-foreground">Updated on 09:30 at 26/04/2024</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Total Score: 3.4/4 (+50% from last testing)</span>
            <Button variant="outline" size="sm" className="bg-white">
              <Download className="mr-2 h-4 w-4" />
              Download Now
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Report Card:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Chart Section */}
              <div className="grid grid-cols-2 gap-4 border rounded-lg p-4">
                {/* Left side - Chart */}
                <div className="w-full flex justify-center items-center">
                  <ChartContainer className="w-[300px] h-[300px]">
                    <svg width={300} height={300} className="overflow-visible">
                      {/* Reference circles */}
                      {[1, 2, 3, 4].map((score) => (
                        <circle
                          key={score}
                          cx={150}
                          cy={150}
                          r={(score / 4) * 120}
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      ))}
                      
                      {/* Pie segments */}
                      {(() => {
                        let currentAngle = -Math.PI / 2;
                        return data.map((item, i) => {
                          const angleSize = (item.weightage / 100) * 2 * Math.PI;
                          const radius = (item.score / 4) * 120;
                          const startAngle = currentAngle;
                          const endAngle = currentAngle + angleSize;
                          
                          const x1 = 150 + radius * Math.cos(startAngle);
                          const y1 = 150 + radius * Math.sin(startAngle);
                          const x2 = 150 + radius * Math.cos(endAngle);
                          const y2 = 150 + radius * Math.sin(endAngle);
                          
                          const path = `M 150 150
                                       L ${x1} ${y1}
                                       A ${radius} ${radius} 0 ${angleSize > Math.PI ? 1 : 0} 1 ${x2} ${y2}
                                       Z`;
                          
                          currentAngle = endAngle;
                          
                          return (
                            <path
                              key={i}
                              d={path}
                              fill={item.color}
                              stroke="white"
                              strokeWidth="2"
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                              onMouseEnter={() => setActiveIndex(i)}
                            />
                          );
                        });
                      })()}
                      
                      {/* Score labels */}
                      {[1, 2, 3, 4].map((score) => (
                        <text
                          key={score}
                          x={155}
                          y={150 - (score / 4) * 120}
                          fontSize="10"
                          fill="#6b7280"
                        >
                          {score}
                        </text>
                      ))}
                    </svg>
                  </ChartContainer>
                </div>

                {/* Right side - Analysis */}
                <div className="pl-4 border-l">
                  {/* Header with title and score - with bottom border */}
                  <div className="pb-4 mb-4 border-b">
                    {/* Title and weightage */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold leading-tight mb-1">
                          {data[activeIndex].name}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          ({data[activeIndex].weightage}% weightage)
                        </p>
                      </div>
                      
                      {/* Score display */}
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-semibold">
                          {data[activeIndex].score}/4
                        </span>
                        <span className="text-red-500 text-xs text-end">
                          Very Bad
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details list with adjusted spacing */}
                  <ul className="space-y-3">
                    {data[activeIndex].details.split('. ').map((detail, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improve Score Section */}
              <div className="space-y-2">
                <h3 className="font-semibold">Improve Your Score:</h3>
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <p className="text-sm">Suspendisse in urna bibendum ante placerat accumsan.</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    High Impact
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Pending Tasks
                <span className="bg-red-700 text-white text-xs px-2 py-0.5 rounded-md">69</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 space-y-4">
                {/* Title with buttons */}
                <div className="space-y-3">
                  <p className="text-sm font-medium">
                    Suspendisse in urna bibendum ante placerat accumsan.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-indigo-700 hover:bg-indigo-800"
                    >
                      Explain
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Download Template
                    </Button>
                  </div>
                </div>

                {/* Description text */}
                <p className="text-sm text-gray-600">
                  Ut sit amet massa arcu. Donec facilisis, ex lacinia placerat facilisis, mi mauris mattis mi, a mollis urna nisl non nisl. Nullam lacinia lacinia est in feugiat. Donec quis pulvinar arcu, et feugiat ex. Ut sit amet massa arcu. Donec facilisis, ex lacinia placerat facilisis, mi mauris mattis mi, a mollis urna nisl non nisl. Nullam lacinia lacinia est in feugiat. Donec quis pulvinar arcu, et feugiat ex.
                </p>

                {/* Bottom buttons */}
                <div className="flex justify-end items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    🔧 Connect Tool
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-gray-700 hover:bg-gray-800"
                  >
                    📤 Upload Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Repository</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Section with Autocomplete */}
              <div className="relative">
                <div className="relative">
                  <Input 
                    placeholder="Generative Search" 
                    className="w-full border-2 pr-10"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsCommandOpen(true);
                    }}
                    onFocus={() => setIsCommandOpen(true)}
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsCommandOpen(false)}
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>

                {/* Autocomplete Dropdown */}
                {isCommandOpen && (
                  <div className="absolute w-full z-50">
                    <Command className="rounded-lg border shadow-md">
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                          {searchSuggestions
                            .filter(suggestion => 
                              suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((suggestion, index) => (
                              <CommandItem
                                key={index}
                                onSelect={() => {
                                  setSearchQuery(suggestion);
                                  setIsCommandOpen(false);
                                }}
                                className="cursor-pointer"
                              >
                                <Search className="mr-2 h-4 w-4" />
                                {suggestion}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                )}
              </div>
              
              {/* AI Response Section */}
              <div>
                {/* Yellow box only shows when there's a search query */}
                {searchQuery && (
                  <div className="bg-yellow-50 p-4 rounded-lg mb-6 text-center">
                    <p className="text-lg text-gray-700">
                      {`Showing results for: ${searchQuery}`}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  {filteredResponses.map((item, index) => (
                    <div
                      key={index}
                      className="relative border-2 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-sm text-gray-700 mb-8">{item.text}</p>
                      {item.files && (
                        <div className="absolute bottom-2 right-2">
                          <span className="text-xs bg-white px-2 py-1 rounded border">
                            {item.files}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}